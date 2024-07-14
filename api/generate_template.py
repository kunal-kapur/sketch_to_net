from pathlib import Path
from jinja2 import Template
from layers import LinearLayer, ActivationFunction
import errors
import os


# safe way to get the path of something when directory changes via running pyhton script
__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
template_str = Path(f"{__location__}/template.py").read_text()

template = Template(template_str)

def generate_python_code(ordered_layers):
    print(ordered_layers[0].name)
    if ordered_layers[0].name != "Input Layer":
        raise errors.InputNotStartingException
    print(ordered_layers[0].attributes)
    prev_size = ordered_layers[0].attributes['size']
    new_layers = []
    for layer in ordered_layers:
        if layer.name == "Linear Layer":
            new_layers.append(LinearLayer(in_features=prev_size, out_features=layer.attributes['size']))
            prev_size = layer.attributes['size']
        elif layer.name == "Activation Function":
            new_layers.append(ActivationFunction(type=layer.attributes['function']))
    
    params = {
        "layers": new_layers
    }
    # Render the template with the provided parameters
    rendered_code = template.render(params)

    print("Generated PyTorch script:")
    return rendered_code

