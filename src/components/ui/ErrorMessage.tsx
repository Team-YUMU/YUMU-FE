export default function ErrorMessage({ errorMessage }: { errorMessage: string | undefined }) {
  return <div className='mt-[0.8rem] text-0.8-400 text-red-F'>{errorMessage}</div>;
}
