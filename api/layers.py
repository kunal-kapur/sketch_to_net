class Layer():

    def __init__(self, name):
        self.name = name

class LinearLayer(Layer):
    def __init__(self, in_features, out_features):
        super().__init__("Linear Layer")
        self.in_features = in_features
        self.out_features = out_features

class LossLayer(Layer):
    def __init__(self, name):
        super().__init__("Loss Layer")
        self.mapping = {
            "Sigmoid" : "torch.nn.simoid()",
            "MSE" : "torch.nn.MSELoss()",
            "NLL": "torch.nn.NLLLoss",
        }
    
class ActivationFunction(Layer):

    def __init__(self, type):
        super().__init__("Activation Function")
        self.type = type
        self.mapping = {
            "ReLU": "torch.nn.ReLU()",
            "Tahn": "torch.nn.Tahn()",
            "Sigmoid": "torch.nn.Sigmoid()"
        }
    def get_function(self):
        return self.mapping[self.type]