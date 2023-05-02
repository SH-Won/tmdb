interface ColumnExplainProps {
  title: string
  explain: string | string[]
}

const ColumnExplain = (props: ColumnExplainProps) => {
  return (
    <div className="column-explain">
      <strong>{props.title}</strong>
      {typeof props.explain === 'string' ? (
        <span>{props.explain}</span>
      ) : (
        props.explain.map((item) => <span key={item}>{item}</span>)
      )}
    </div>
  )
}

export default ColumnExplain
