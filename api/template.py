
#Show as a .py file to make it easier to view syntax 


import torch.nn as nn

# Define the neural network model
class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.ModuleList()
        {% for layer in (layers) %}
        {% if layer.name == "Linear Layer" %}
        self.layers.append(nn.Linear(in_features={{layer.in_features}}, out_features={{layer.out_features}}))
        {% elif layer.name == "Activation Function" %}
        self.layers.append({{layer.get_function()}})
        {% endif %}
        {% endfor %}
        self.layers = nn.Sequential(*self.layers)

    def forward(self, x):
        return self.layers.forward()
