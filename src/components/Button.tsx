type Props = {
  onClick: () => void;
}

export const Button = ({onClick}: Props) => {

  return (
    <button onClick={onClick} type={'submit'} className={'bg-orange-500 text-white rounded-md p-2 font-bold'}>
      Search
    </button>
  )
}