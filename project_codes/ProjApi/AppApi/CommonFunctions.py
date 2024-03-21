import json

import nsepythonserver as np
import numpy_financial as npf
import pandas as pd
import plotly.express as px
import plotly.graph_objects as pl
from sympy import Derivative, Eq, Symbol, solve
from sympy.parsing.sympy_parser import (convert_xor, implicit_application,
                                        parse_expr, standard_transformations)


def maxima_minima(function):
    transformations = standard_transformations + (implicit_application, convert_xor)
    f = parse_expr(function, transformations=transformations)
    x = Symbol('x')
    d1 = Derivative(f, x).doit()
    
    critical_points = solve(d1)
    
    all_maxima = ""
    all_minima = ""
    
    maxima_vals = ""
    minima_vals = ""
    d2 = Derivative(f, x, 2).doit()
    
    threshold = 1e-10  
    
    for A in critical_points:
        if A.is_real:
            d2_value = d2.subs({x: A}).evalf()
            if d2_value > threshold:
                all_minima += str(A) + " "
                minima_vals += str(f.subs({x: A}).evalf()) + " "
            elif d2_value < -threshold:
                all_maxima += str(A) + " "
                maxima_vals += str(f.subs({x: A}).evalf()) + " "
    
    total_points = {"Maxima": all_maxima, "Minima": all_minima , "Maxima_Values": maxima_vals , "Minima_Values": minima_vals}
    print(total_points)
    return total_points


   