export const bgGradientVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const bgGradientFragmentShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform vec3 uColorBg;
  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    vec3 col = uColorBg;
    
    // Animated gradient orbs
    float orb1 = smoothstep(0.6, 0.0, length(uv - vec2(sin(uTime * 0.3) * 0.3, cos(uTime * 0.2) * 0.2)));
    float orb2 = smoothstep(0.5, 0.0, length(uv - vec2(cos(uTime * 0.25 + 1.0) * 0.35, sin(uTime * 0.35 + 0.5) * 0.25)));
    float orb3 = smoothstep(0.7, 0.0, length(uv - vec2(sin(uTime * 0.4 + 2.0) * 0.25, cos(uTime * 0.3 + 1.5) * 0.3)));
    
    // Subtle light gray/blue tint for orbs
    col += vec3(0.95, 0.96, 0.98) * orb1 * 0.08;
    col += vec3(0.94, 0.95, 0.97) * orb2 * 0.06;
    col += vec3(0.96, 0.97, 0.99) * orb3 * 0.07;
    
    // Mouse-following spotlight
    float mouseDist = length(uv - uMouse * 0.15);
    float mouseLight = smoothstep(0.5, 0.0, mouseDist) * 0.04;
    col += vec3(0.97, 0.98, 1.0) * mouseLight;
    
    // Subtle noise texture for organic feel
    float noise = snoise(uv * 3.0 + uTime * 0.1) * 0.005;
    col += noise;
    
    // Very subtle gradient based on position
    col += vec3(0.02, 0.02, 0.03) * (uv.y + 0.5) * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`;
