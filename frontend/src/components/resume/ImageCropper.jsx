import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { ZoomIn, ZoomOut, RotateCw, Check, X } from 'lucide-react';

/**
 * Utility: crop image on a canvas and return as base64
 */
const getCroppedImg = (imageSrc, pixelCrop, rotation = 0) => {
    return new Promise((resolve) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const radian = (rotation * Math.PI) / 180;
            const sin = Math.abs(Math.sin(radian));
            const cos = Math.abs(Math.cos(radian));
            const bW = image.width * cos + image.height * sin;
            const bH = image.width * sin + image.height * cos;

            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            ctx.translate(-pixelCrop.x, -pixelCrop.y);
            ctx.translate(bW / 2, bH / 2);
            ctx.rotate(radian);
            ctx.translate(-image.width / 2, -image.height / 2);
            ctx.drawImage(image, 0, 0);

            resolve(canvas.toDataURL('image/jpeg', 0.92));
        };
        image.src = imageSrc;
    });
};

const ImageCropper = ({ imageSrc, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = useCallback((_, croppedAreaPx) => {
        setCroppedAreaPixels(croppedAreaPx);
    }, []);

    const handleConfirm = async () => {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
        onCropComplete(croppedImage);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', flexDirection: 'column',
            backdropFilter: 'blur(8px)',
        }}>
            {/* Header */}
            <div style={{
                padding: '16px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
                <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                    Crop Profile Picture
                </h3>
                <button onClick={onCancel} style={{
                    background: 'none', border: 'none', color: '#aaa', cursor: 'pointer',
                    padding: '4px', display: 'flex', alignItems: 'center',
                }}>
                    <X size={22} />
                </button>
            </div>

            {/* Crop area */}
            <div style={{ flex: 1, position: 'relative', minHeight: '300px' }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropChange}
                />
            </div>

            {/* Controls */}
            <div style={{
                padding: '20px 24px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(10,10,15,0.95)',
            }}>
                {/* Zoom slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ZoomOut size={16} color="#aaa" />
                    <input
                        type="range"
                        min={1} max={3} step={0.05}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        style={{
                            flex: 1, height: '4px', accentColor: '#6c63ff',
                            WebkitAppearance: 'none', appearance: 'none',
                            background: `linear-gradient(to right, #6c63ff ${((zoom - 1) / 2) * 100}%, rgba(255,255,255,0.15) ${((zoom - 1) / 2) * 100}%)`,
                            borderRadius: '2px', outline: 'none', cursor: 'pointer',
                        }}
                    />
                    <ZoomIn size={16} color="#aaa" />
                    <span style={{ color: '#888', fontSize: '12px', minWidth: '36px', textAlign: 'right' }}>
                        {Math.round(zoom * 100)}%
                    </span>
                </div>

                {/* Rotation button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        onClick={() => setRotation((r) => (r + 90) % 360)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px', padding: '8px 14px',
                            color: '#ccc', cursor: 'pointer', fontSize: '13px',
                        }}
                    >
                        <RotateCw size={14} /> Rotate
                    </button>
                    <span style={{ color: '#666', fontSize: '12px' }}>{rotation}°</span>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '10px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                            color: '#ccc', cursor: 'pointer',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        style={{
                            padding: '10px 28px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                            background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
                            border: 'none', color: '#fff', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '6px',
                            boxShadow: '0 0 20px rgba(108,99,255,0.3)',
                        }}
                    >
                        <Check size={16} /> Apply Crop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
