import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Home, ShoppingCart, Train, Lightbulb, Heart, Smile, MoreHorizontal, AlertCircle } from 'lucide-react';
import { costAnalysisService, type CostAnalysis } from '../services/costAnalysis';

export function CityAnalysis() {
  const { cityName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<CostAnalysis | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!cityName) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await costAnalysisService.getCostAnalysis(cityName);
        setAnalysis(data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load cost analysis');
        console.error('Error fetching analysis:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [cityName]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !analysis || !analysis.monthly_costs) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Error</h2>
        <p className="mt-2 text-gray-500">{error || 'Failed to load analysis data'}</p>
      </div>
    );
  }

  const costIcons = {
    housing: <Home className="h-6 w-6" />,
    food: <ShoppingCart className="h-6 w-6" />,
    transportation: <Train className="h-6 w-6" />,
    utilities: <Lightbulb className="h-6 w-6" />,
    healthcare: <Heart className="h-6 w-6" />,
    entertainment: <Smile className="h-6 w-6" />,
    other: <MoreHorizontal className="h-6 w-6" />
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'expensive': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'affordable': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Calculate monthly total only if we have valid data
  const monthlyTotal = Object.values(analysis.monthly_costs).reduce((sum, cost) => sum + (cost || 0), 0);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{cityName}</h1>
          <p className="mt-1 text-sm text-gray-500">{analysis.summary}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <p className="text-sm text-gray-500">Monthly Total</p>
            <p className="text-xl font-semibold text-gray-900">
              ${monthlyTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Annual Total</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${(analysis.annual_total || monthlyTotal * 12).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </header>

      {/* Monthly Costs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analysis.monthly_costs)
            .sort(([,a], [,b]) => (b || 0) - (a || 0))
            .map(([category, cost]) => (
              <div key={category} className="p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="text-indigo-600">
                    {costIcons[category as keyof typeof costIcons]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 capitalize">{category}</h3>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(cost || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {((cost / monthlyTotal) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Cost Ratings */}
      {analysis.cost_ratings && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Cost Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(analysis.cost_ratings).map(([key, rating]) => (
              <div key={key} className="p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-500 capitalize">{key.replace('_', ' ')}</h3>
                <p className={`mt-1 text-lg font-semibold ${getRatingColor(rating)} inline-block px-2 py-1 rounded`}>
                  {rating}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost Insights */}
      {analysis.cost_insights && analysis.cost_insights.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Cost Insights</h2>
          <ul className="space-y-4">
            {analysis.cost_insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600 leading-relaxed">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}