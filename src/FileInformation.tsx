import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";

interface Props {
  file: File | null;
}

function FileInformation(props: Props) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">File Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>File name:</Label>
          <Label className="text-right">
            {props.file?.name}
          </Label>
        </div>
        <div className="flex items-center justify-between">
          <Label>File size:</Label>
          <Label className="text-right">
            {props.file?.size ? `${(props.file.size / 1024).toFixed(2)} KB` : ""}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}

export default FileInformation;