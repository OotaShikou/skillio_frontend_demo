import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const WorkbookForm = (props: {
  params: { title: string }
  setParams: (params: { title: string }) => void
  error?: { path: string; message: string }[]
}) => {
  return (
    <div className="grid py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-left">
          タイトル
        </Label>
        <Input
          id="title"
          value={props.params.title}
          onChange={(e) => props.setParams({ ...props.params, title: e.target.value })}
          className="col-span-3"
        />
      </div>
      {props.error &&
        props.error
          .filter((error) => error.path === 'title')
          .map((error) => (
            <p key={error.path} className="pb-4 text-red-500">
              {error.message}
            </p>
          ))}
    </div>
  )
}

export default WorkbookForm
