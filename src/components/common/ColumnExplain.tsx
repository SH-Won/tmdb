interface ColumnExplainProps {
  title: string
  explain: string | string[]
  breakWords?: boolean
}

const ColumnExplain = (props: ColumnExplainProps) => {
  return (
    <div className="column-explain">
      <strong>{props.title}</strong>
      {props.explain && typeof props.explain !== 'string' ? (
        props.explain.map((item) => <span key={item}>{item}</span>)
      ) : (
        <span className={props.breakWords ? 'break-words' : ''}>{props.explain}</span>
      )}
    </div>
  )
}

export default ColumnExplain
