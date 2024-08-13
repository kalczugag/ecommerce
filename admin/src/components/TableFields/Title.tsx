interface TitleProps {
    title: string;
    subtitle: string;
}

const Title = ({ title, subtitle }: TitleProps) => {
    return (
        <div className="flex flex-col">
            <h3 className="text-lg">{title}</h3>
            <h4>{subtitle}</h4>
        </div>
    );
};

export default Title;
