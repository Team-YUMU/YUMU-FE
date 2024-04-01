export default function ErrorMessage({ errorMessage }: { errorMessage: string | undefined }) {
  return <div className='mt-[0.8rem] text-12-400 text-red-F'>{errorMessage}</div>;
}
