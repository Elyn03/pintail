import CustomButton from "@/shared/components/ui/CustomButton.tsx";

interface ButtonProps {
  id: number;
}

export default function EditTripButton({ id }: ButtonProps) {
  return (
    <CustomButton
      variant="contained"
      color="secondary"
      size="medium"
      navigateLink={"/trip/edit/" + id}
    >
      🖍
    </CustomButton>
  );
}
