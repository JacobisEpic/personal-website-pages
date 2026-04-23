# Personal-Website

```bash
  npm run dev
  npm run build
```
## Useful Links
https://www.youtube.com/watch?v=F3xPY48DomI&t=137s&ab_channel=codeSTACKr
https://www.youtube.com/watch?v=0fYi8SGA20k&ab_channel=JavaScriptMastery

## Building Tips
- When building it, you get a dist file. The dist file should be updated. Zip it and put it in the public_html folder in the file manager. To login to the file manager, got to this link:
- https://billing.stablehost.com/index.php

it leads to a cPanel File Manager

![Screenshot 2024-09-24 at 10 53 32 PM](https://github.com/user-attachments/assets/50ab1c22-589a-4039-b607-3f6f1e191807)
Delete these files

---

For the following issue:
```
index-91108b02.js:71 THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values. lt {isBufferGeometry: true, uuid: '1e9ee999-d691-45d6-b640-7e7445bb4600', name: '', type: 'BufferGeometry', index: null, …}
computeBoundingSphere @ index-91108b02.js:71
intersectsObject @ index-91108b02.js:110
hn @ index-91108b02.js:3208
hn @ index-91108b02.js:3208
hn @ index-91108b02.js:3208
Z1.render @ index-91108b02.js:3208
update @ index-91108b02.js:75
(anonymous) @ index-91108b02.js:3290
hc @ index-91108b02.js:3238
_S @ index-91108b02.js:3238
xS @ index-91108b02.js:3238
xS @ index-91108b02.js:3238
sI @ index-91108b02.js:3238
cI @ index-91108b02.js:3238
ra @ index-91108b02.js:3238
MS @ index-91108b02.js:3238
T @ index-91108b02.js:3224
Z @ index-91108b02.js:3224Understand this error
index-91108b02.js:3208  GET https://jacobchin.org/planet/scene.gltf 403 (Forbidden)
load @ index-91108b02.js:3208
load @ index-91108b02.js:3279
(anonymous) @ index-91108b02.js:3242
(anonymous) @ index-91108b02.js:3242
(anonymous) @ index-91108b02.js:3242
b3 @ index-91108b02.js:3242
w5 @ index-91108b02.js:3242
Bh @ index-91108b02.js:3242
bA @ index-91108b02.js:3280
p9 @ index-91108b02.js:3290
p0 @ index-91108b02.js:3236
IS @ index-91108b02.js:3238
PS @ index-91108b02.js:3238
lI @ index-91108b02.js:3238
bd @ index-91108b02.js:3238
MS @ index-91108b02.js:3238
T @ index-91108b02.js:3224
Z @ index-91108b02.js:3224Understand this error
index-91108b02.js:3238 Error: Could not load ./planet/scene.gltf: fetch for "https://jacobchin.org/planet/scene.gltf" responded with 403: )
    at index-91108b02.js:3242:23308
    at Object.a [as onError] (index-91108b02.js:3279:14804)
    at index-91108b02.js:3208:181485
_0 @ index-91108b02.js:3238
Jw.b.componentDidCatch.g.callback @ index-91108b02.js:3238
pw @ index-91108b02.js:3236
_S @ index-91108b02.js:3238
xS @ index-91108b02.js:3238
sI @ index-91108b02.js:3238
cI @ index-91108b02.js:3238
ra @ index-91108b02.js:3238
MS @ index-91108b02.js:3238
T @ index-91108b02.js:3224
Z @ index-91108b02.js:3224Understand this error
index-91108b02.js:40 Error: Could not load ./planet/scene.gltf: fetch for "https://jacobchin.org/planet/scene.gltf" responded with 403: )
    at index-91108b02.js:3242:23308
    at Object.a [as onError] (index-91108b02.js:3279:14804)
    at index-91108b02.js:3208:181485
sx @ index-91108b02.js:40
V2.t.callback @ index-91108b02.js:40
SM @ index-91108b02.js:38
zM @ index-91108b02.js:40
rP @ index-91108b02.js:40
BF @ index-91108b02.js:40
FF @ index-91108b02.js:40
xa @ index-91108b02.js:40
sP @ index-91108b02.js:40
T @ index-91108b02.js:25
Z @ index-91108b02.js:25Understand this error
index-91108b02.js:3242 Uncaught Error: Could not load ./planet/scene.gltf: fetch for "https://jacobchin.org/planet/scene.gltf" responded with 403: )
    at index-91108b02.js:3242:23308
    at Object.a [as onError] (index-91108b02.js:3279:14804)
    at index-91108b02.js:3208:181485
(anonymous) @ index-91108b02.js:3242
a @ index-91108b02.js:3279
(anonymous) @ index-91108b02.js:3208
Promise.catch
load @ index-91108b02.js:3208
load @ index-91108b02.js:3279
(anonymous) @ index-91108b02.js:3242
(anonymous) @ index-91108b02.js:3242
(anonymous) @ index-91108b02.js:3242
b3 @ index-91108b02.js:3242
w5 @ index-91108b02.js:3242
Bh @ index-91108b02.js:3242
bA @ index-91108b02.js:3280
p9 @ index-91108b02.js:3290
p0 @ index-91108b02.js:3236
IS @ index-91108b02.js:3238
PS @ index-91108b02.js:3238
lI @ index-91108b02.js:3238
bd @ index-91108b02.js:3238
MS @ index-91108b02.js:3238
T @ index-91108b02.js:3224
Z @ index-91108b02.js:3224Understand this error
2index-91108b02.js:3208 THREE.WebGLRenderer: Context Lost.
```

The issue is becase of safari and iphone rendering. When deploying, ensure static assets are publicly accessible. The `planet/` directory must have `0755` permissions and `.gltf` files should be `0644`. If permissions are too restrictive, the server will return a 403 error, which can cause Three.js to fail and the UI to render as a blank screen.
`public_html/planet` folder must be 0755.
In `public_html/planet`, make sure the permissions for `scene.gltf` to 0644.
