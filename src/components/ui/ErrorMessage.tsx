export default function ErrorMessage({ errorMessage }: { errorMessage: string | undefined }) {
  return <div className='text-0.8-400 mt-[0.8rem] text-red-F'>{errorMessage}</div>;
}
