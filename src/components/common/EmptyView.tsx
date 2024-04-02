type EmptyViewProps = {
  text: string;
};

export default function EmptyView({ text }: EmptyViewProps) {
  return (
    <div className='flex items-center justify-center'>
      <p className='text-16-400'>{text}</p>
    </div>
  );
}
