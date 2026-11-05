"""Run `node check.cjs` first; compare implementation with independent formulae."""
from pathlib import Path
import json
import numpy as np
from scipy.special import jv
r = json.loads(Path(__file__).with_name('test-output.json').read_text())
errors = []
for s in r['samples']:
    f = s['f']
    if s['shape'] == 'circle' and f >= 1:
        a = (25e-6 / np.pi)**0.5
        ar = s['z']['ar']
        q = a * np.sqrt(-1j * 2*np.pi*f*ar['rho']/ar['mu'])
        exact = (1-2*jv(1,q)/(q*jv(0,q)))/(1j*2*np.pi*f*ar['rho'])
        errors.append(abs((complex(*s['H'])-exact)/exact))
    if s['shape'] in ['square', 'slit'] and f == .001:
        g = s['z']['g']
        w,h,mu = g['w'],g['h'],s['z']['ar']['mu']
        odd = np.arange(1,1000,2)
        exact = h*h/(12*mu)*(1-192*h/(np.pi**5*w)*np.sum(np.tanh(odd*np.pi*w/(2*h))/odd**5))
        assert abs((s['H'][0]-exact)/exact) < .0001
assert max(errors) < .001
print('Independent checks passed; max circular relative error:',max(errors))
