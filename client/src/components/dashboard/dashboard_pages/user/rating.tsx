import React from 'react';

interface ProgressBarProps {
    title: string;
    percentage: number;
    color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, percentage, color }) => (
    <div>
        <div className="flex justify-between items-center">
            <p className="text-base font-medium">
                {title}
            </p>
            <p className="text-base font-medium" style={{ color }}>
                {percentage}%
            </p>
        </div>
        <div className="relative mt-2 w-full h-2 bg-gray-200 rounded">
            <div
                className="absolute h-full rounded"
                style={{ width: `${percentage}%`, backgroundColor: color }}
            />
        </div>
    </div>
);

const RatingInfo = [
    { title: 'The Barber', percentage: 70, color: '#3C5B6F' },
    { title: 'Modern Stylist', percentage: 80, color: '#40A578' },
    { title: 'TrendSetter', percentage: 90, color: '#006769' },
    { title: 'Grand-Dad', percentage: 65, color: '#577B8D' },
    { title: 'Calm Cut', percentage:35, color: '#EE4E4E' },
    { title: 'Diva Stylist', percentage: 55, color: '#F7C566' },
];

const Ratings: React.FC = () => {
    return (
        <div
            className="p-4 bg-gray-200 text-gray-800 rounded-lg flex flex-col"
            id="chart"
        >
            <p className="text-lg font-semibold">
                Stylist Ratings
            </p>
            <div className="my-5 flex flex-col gap-4">
                {RatingInfo.map((bar) => 
                    <ProgressBar key={bar.title} {...bar} />
                )}
            </div>
        </div>
    );
}

export default Ratings;
