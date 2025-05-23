import pandas as pd
from django.http import JsonResponse,  HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .sentiment_analyzer import analyze_sentiment
from io import StringIO

def home(request):
    return HttpResponse("Welcome to the News Sentiment Dashboard!")


@csrf_exempt
def analyze_headlines(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        headlines = data.get('headlines', [])
        results = []
        for headline in headlines:
            result = analyze_sentiment(headline)
            results.append({
                'headline': headline,
                'sentiment': result['sentiment'],
                'score': result['score']
            })

        df = pd.DataFrame(results)
        sentiment_counts = df['sentiment'].value_counts().to_dict()
        top_positive = df[df['sentiment'] == 'Positive'].nlargest(5, 'score')
        top_negative = df[df['sentiment'] == 'Negative'].nsmallest(5, 'score')

        return JsonResponse({
            'sentiment_counts': sentiment_counts,
            'results': results,
            'top_positive': top_positive.to_dict(orient='records'),
            'top_negative': top_negative.to_dict(orient='records')
        })
        


    return JsonResponse({'error': 'Only POST allowed'})


