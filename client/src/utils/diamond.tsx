export default function Diamond ({ size, top, left }: any) {
    return (
        <div
            style={{
                width: size,
                height: size,
                backgroundColor: '#153448',
                position: 'absolute',
                top: top,
                left: left,
                transform: 'rotate(45deg)',
                zIndex: 0,
            }}
        />
    );
}

