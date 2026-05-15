import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

import Albedo from "/textures/Albedo.jpg";
import Bump from "/textures/Bump.jpg";
import Clouds from "/textures/Clouds.png";
import NightLights from "/textures/night_lights_modified.png";
import Ocean from "/textures/Ocean.png";
import Stars from "/textures/Gaia_EDR3_darkened.png";

function EarthModel() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const galaxyRef = useRef();

  const [colorMap, bumpMap, cloudMap, nightMap, oceanMap, bgMap] = useLoader(TextureLoader, [
    Albedo,
    Bump,
    Clouds,
    NightLights,
    Ocean,
    Stars,
  ]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = elapsed * 0.05;
    if (cloudsRef.current) cloudsRef.current.rotation.y = elapsed * 0.06;
  });

  return (
    <>
      {/* Static Background Galaxy */}
      <mesh ref={galaxyRef}>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial map={bgMap} side={THREE.BackSide} />
      </mesh>

      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.1}
          emissiveMap={nightMap}
          emissiveIntensity={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.3}
          roughness={1}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent
          opacity={0.3}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

useLoader.preload(TextureLoader, [Albedo, Bump, Clouds, NightLights, Ocean, Stars]);

export default EarthModel;
