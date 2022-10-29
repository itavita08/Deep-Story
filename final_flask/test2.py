from torch import autocast
from diffusers import StableDiffusionPipeline
import torch

def model():
    token = "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"

    pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", use_auth_token=token)
    pipe = pipe.to("cuda")
    return pipe

def run(text):
    pipe = loadModel()
    prompt = text
    with autocast("cuda"):
        image = pipe(prompt).images[0] 
    return image

def saveModel():
    import torch
    
    pipe = model()
    torch.save(pipe,'diffusion.h5')
    
def loadModel():
    import torch
    
    pipe = torch.load("diffusion.h5", map_location=torch.device('cpu'))
    return pipe
    

def saveImage(text):
    from PIL import Image
    
    image = run(text)
    image.save("static/image/" + text + ".png", format="PNG")
    
    

# saveImage()