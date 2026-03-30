const TYPE_CLASS = {
  info:   'note-info',
  warn:   'note-warn',
  danger: 'note-danger',
  ok:     'note-ok',
}

const DOT_CLASS = {
  info:   'dot-info',
  warn:   'dot-warn',
  danger: 'dot-danger',
  ok:     'dot-ok',
}

export default function NoteItem({ type, text }) {
  return (
    <div className={`note-row ${TYPE_CLASS[type] ?? 'note-info'}`}>
      <div className={`note-dot ${DOT_CLASS[type] ?? 'dot-info'}`} />
      <span>{text}</span>
    </div>
  )
}
