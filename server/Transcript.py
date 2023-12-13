from pytube import YouTube
from youtube_transcript_api import YouTubeTranscriptApi


video_url = "https://www.youtube.com/watch?v=yVdKa8dnKiE&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=7"

try:
    # Create a YouTube object
    yt = YouTube(video_url)

    # Get the highest resolution stream
    # video_stream = yt.streams.get_highest_resolution()

    # # Download the video
    # video_stream.download()

    # Get the video ID from the URL
    video_id = video_url.split("v=")[1]

    # Get the video transcript
    transcripts = YouTubeTranscriptApi.get_transcript(video_id)

    if transcripts:
        # Extract the transcripts as text
        subtitle_text = " ".join([entry["text"] for entry in transcripts])

        # print("Transcripts:")
        # print(subtitle_text)
    else:
        print("Transcripts not available for this video.")

except Exception as e:
    print(f"An error occurred: {str(e)}")

import requests


# API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
# headers = {"Authorization": "Bearer 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"}

# def query(payload):
# 	response = requests.post(API_URL, headers=headers, json=payload)
# 	return response.json()
	
# output = query({
# 	"inputs": subtitle_text,
#     "parameters": {
#         "max_length": 600,
#         "min_length": 500,
#         "length_penalty": 2.0,
#         "num_beams": 4,
#     }
# })

# print(output)


import requests

API_URL = "https://api-inference.huggingface.co/models/distilgpt2"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": "Do you work on APIs?",
})

print(output)