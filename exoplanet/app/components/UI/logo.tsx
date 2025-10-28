// app/components/MetaMaskLogo.tsx
"use client";

import { useEffect, useRef } from "react";

export default function MetaMaskLogo() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let viewer: any;

    const loadLogo = async () => {
      try {
        // Dynamically import MetaMask 3D logo library
        const mod = await import("@metamask/logo");
        const MetaMaskLogo = mod.default;

        // Create the viewer instance
        viewer = MetaMaskLogo({
          pxNotRatio: true,
          width: 240,
          height: 240,
          followMouse: true,
          slowDrift: true,
        });

        // Mount to container
        if (hostRef.current) {
          hostRef.current.innerHTML = "";
          hostRef.current.appendChild(viewer.container);
        }
      } catch (err) {
        console.error("Failed to load MetaMask logo:", err);
      }
    };

    loadLogo();

    // Cleanup on unmount
    return () => {
      viewer?.stopAnimation?.();
      viewer?.destroy?.();
    };
  }, []);

  return <div ref={hostRef} style={{ width: 240, height: 240 }} />;
}
