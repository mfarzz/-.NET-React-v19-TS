interface Props {
  name: string;
  description: string;
  image?: string;
}

const Pizza = (props: Props) => {
  return (
    <div className="my-2.5 flex flex-col justify-center items-center leading-normal">
      <h1 className="font-normal text-secondary text-[25px]">{props.name}</h1>
      <p className="mb-1.25">{props.description}</p>
      <img
        className="max-w-50 border border-border rounded-[5px]"
        src={props.image ? props.image : "https://picsum.photos/200"}
        alt={props.name}
      />
    </div>
  );
};

export default Pizza;
