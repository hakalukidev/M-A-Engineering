import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Generated favicon mirroring the MAE badge (pink circle, orange accent dot). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#e0157a",
          borderRadius: "50%",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        M
        <div
          style={{
            position: "absolute",
            right: 3,
            bottom: 3,
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#f5a623",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
