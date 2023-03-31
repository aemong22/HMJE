import logging

from flask import Flask
from flask_restx import Api, Resource
from flask_cors import CORS

from waitress import serve
from paste.translogger import TransLogger

import tts
import soundfile as sf

import firebase_admin
from firebase_admin import credentials, initialize_app, storage

# TTS 모델 불러오기
synthesizer = tts.Synthesizer(
    "/root/glow-tts/best_model.pth.tar",
    "/root/glow-tts/config.json",
    None,
    "/root/hifi-gan/best_model_461924.pth.tar",
    "/root/hifi-gan/config.json",
    None,
    None,
    False,
)
symbols = synthesizer.tts_config.characters.characters

# firebase bucket 불러오기
cred = credentials.Certificate(
    "/root/tts0-cee7a-firebase-adminsdk-lg9cn-a7b4664123.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'tts0-cee7a.appspot.com'
})

bucket = storage.bucket()

app = Flask(__name__)
api = Api(
    app,
    version='0.1',
    title="Flask API Server",
    description="Flask API Server!",
    terms_url="/"
)
CORS(app)


@api.route('/api')
class Hello(Resource):
    def get(self):
        return {"message": "Welcome, Hello!"}


@api.route('/api/word/<string:text>')
class Hello(Resource):
    def get(self, text):

        origin_file = '/root/'+text+'.wav'
        upload_file = 'word_sound/'+text+".wav"

        blob = bucket.blob(upload_file)
        if (not blob.exists()):
            wav = synthesizer.tts(text, None, None)

            sf.write(origin_file, wav, 22050)
            blob.upload_from_filename(origin_file)

        # Opt : if you want to make public access from the URL
        blob.make_public()

        return {"date":  blob.public_url, "message": "success"}


if __name__ == "__main__":
    logger = logging.getLogger('waitress')
    serve(TransLogger(app, setup_console_handler=True), host='0.0.0.0', port=8080)
