import CustomButton from "@/shared/components/ui/CustomButton.tsx";
import {useDeleteTripById} from "@/shared/api/queries.ts";

interface ButtonProps {
  id: number;
}

export default function DeleteTripButton({ id }: ButtonProps) {

  const deleteTrip = useDeleteTripById(id.toString() ?? "")

  return (
    <CustomButton
      variant="contained"
      color="secondary"
      size="medium"
      onClick={() => deleteTrip.mutate()}
    >
      🗑
    </CustomButton>
  );
}
