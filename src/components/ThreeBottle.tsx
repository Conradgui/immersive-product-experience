import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBottleProps {
  progress: number;
  opacity: number;
}

export default function ThreeBottle({ progress, opacity }: ThreeBottleProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);

  // Track mouse coordinates for subtle interactive parallax tilt
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup (Closer viewport)
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 3. Renderer Setup (Alpha enabled for transparent canvas background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(420, 480);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights Setup (Luxury studio lighting configuration)
    const ambientLight = new THREE.AmbientLight(0xfffdf9, 0.7);
    scene.add(ambientLight);

    // Strong front-right key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);

    // Rim light to highlight the beveled glass edges on the left
    const rimLight = new THREE.DirectionalLight(0xeef5fc, 3.5);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Subtle fill light from below
    const fillLight = new THREE.DirectionalLight(0xfff4e0, 1.2);
    fillLight.position.set(0, -4, 2);
    scene.add(fillLight);

    // 5. Bottle Assembly Group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;

    const materials: THREE.Material[] = [];
    materialsRef.current = materials;

    // A. Glass Body Geometry (Extruded flat-oval lantern shape)
    const shape = new THREE.Shape();
    const w = 1.35;
    const h = 2.7;
    const r = 0.28;
    
    shape.moveTo(-w/2 + r, -h/2);
    shape.lineTo(w/2 - r, -h/2);
    shape.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
    shape.lineTo(w/2, h/2 - r);
    shape.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
    shape.lineTo(-w/2 + r, h/2);
    shape.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
    shape.lineTo(-w/2, -h/2 + r);
    shape.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);

    const extrudeSettings = {
      depth: 0.65,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
      curveSegments: 32
    };

    const glassGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    glassGeo.center();

    // Premium physical glass material with soft green gradient/color
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xeef9f5,
      transmission: 0.92,
      opacity: 1.0,
      transparent: true,
      roughness: 0.06,
      metalness: 0.0,
      ior: 1.52,
      thickness: 1.1,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    bottleGroup.add(glassMesh);
    materials.push(glassMat);

    // B. Perfume Liquid (Inside)
    const liquidGeo = new THREE.ExtrudeGeometry(shape, {
      ...extrudeSettings,
      depth: 0.52,
      bevelSize: 0.05,
      bevelThickness: 0.05
    });
    liquidGeo.center();

    // Dynamic blue-green/teal perfume liquid
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0x8fcbb3,
      transmission: 0.95,
      opacity: 0.85,
      transparent: true,
      roughness: 0.02,
      ior: 1.333,
      thickness: 0.8
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.scale.set(0.92, 0.92, 0.92);
    bottleGroup.add(liquidMesh);
    materials.push(liquidMat);

    // C. Spray Collar (Silver Metal)
    const collarGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 32);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      metalness: 0.95,
      roughness: 0.12,
      transparent: true
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = h/2 + 0.18;
    bottleGroup.add(collarMesh);
    materials.push(collarMat);

    // D. Clear Glass Cap (Base + Dome)
    const capBaseGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
    const capDomeGeo = new THREE.SphereGeometry(0.32, 32, 32);
    
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 1.0,
      transparent: true,
      roughness: 0.04,
      ior: 1.49,
      thickness: 0.8
    });

    const capBaseMesh = new THREE.Mesh(capBaseGeo, capMat);
    capBaseMesh.position.y = h/2 + 0.4;
    bottleGroup.add(capBaseMesh);

    const capDomeMesh = new THREE.Mesh(capDomeGeo, capMat);
    capDomeMesh.position.y = h/2 + 0.62;
    bottleGroup.add(capDomeMesh);
    materials.push(capMat);

    // E. Thin Diptube (Straw)
    const tubeGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.2, 8);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.5,
      transparent: true,
      roughness: 0.1
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    tubeMesh.position.y = -0.1;
    bottleGroup.add(tubeMesh);
    materials.push(tubeMat);

    // F. Brand Label (Decal mapped from nobg front image)
    const textureLoader = new THREE.TextureLoader();
    const labelTexture = textureLoader.load('/images/jardin_bottle_nobg.png');
    labelTexture.colorSpace = THREE.SRGBColorSpace;

    // Use a flat plane positioned exactly in front of the glass body
    const labelGeo = new THREE.PlaneGeometry(1.35, 2.7);
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      depthWrite: false,
      opacity: 1.0
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    // Align with the front face (depth/2 + bevelThickness + epsilon)
    labelMesh.position.z = 0.65/2 + 0.08 + 0.005;
    bottleGroup.add(labelMesh);
    materials.push(labelMat);

    // Mirror label on the back face for Y-axis rotation realism
    const backLabelMesh = new THREE.Mesh(labelGeo, labelMat);
    backLabelMesh.position.z = -(0.65/2 + 0.08 + 0.005);
    backLabelMesh.rotation.y = Math.PI;
    bottleGroup.add(backLabelMesh);

    // 6. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (bottleGroup) {
        // Soft mouse hover tilt interpolation (smooth lerping)
        const targetTiltX = mouse.current.y * 0.12;
        const targetTiltZ = -mouse.current.x * 0.12;
        
        bottleGroup.rotation.x += (targetTiltX - bottleGroup.rotation.x) * 0.08;
        bottleGroup.rotation.z += (targetTiltZ - bottleGroup.rotation.z) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      
      // Dispose materials & geometries
      glassGeo.dispose();
      liquidGeo.dispose();
      collarGeo.dispose();
      capBaseGeo.dispose();
      capDomeGeo.dispose();
      tubeGeo.dispose();
      labelGeo.dispose();
      labelTexture.dispose();
      
      materials.forEach(mat => mat.dispose());

      if (rendererRef.current && mountRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          // Element already removed
        }
      }
    };
  }, []);

  // Update Y-axis rotation based on scroll progress
  useEffect(() => {
    if (bottleGroupRef.current) {
      // Y-axis continuous rotation: spin Y relative to scroll progress
      // At scroll=0, rotation is 0. By scroll=1, rotation is 2 * PI (360 degrees)
      const targetRotateY = progress * Math.PI * 2.2;
      bottleGroupRef.current.rotation.y = targetRotateY;
    }
  }, [progress]);

  // Update materials opacity based on parent fade out
  useEffect(() => {
    materialsRef.current.forEach((material) => {
      material.opacity = opacity;
      material.needsUpdate = true;
    });
  }, [opacity]);

  return (
    <div 
      ref={mountRef} 
      className="flex items-center justify-center pointer-events-none"
      style={{ 
        width: '420px', 
        height: '480px',
        display: opacity === 0 ? 'none' : 'flex' 
      }}
    />
  );
}
