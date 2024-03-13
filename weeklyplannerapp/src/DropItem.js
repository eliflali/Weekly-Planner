import { useDrop } from 'react-dnd'
let accept = 5
function DropTarget(props) {
  const [collectedProps, drop] = useDrop(() => ({
    accept
  }))

  return <div ref={drop}>Drop Target</div>
} 
export default DropTarget;