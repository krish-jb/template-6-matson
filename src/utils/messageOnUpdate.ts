import { toast } from "@/hooks/use-toast";

export enum useCase {
    Update,
    Delete,
    Save,
}

const messageOnUpdate = (
    isUpdated: boolean,
    sectionName: string,
    action: useCase = useCase.Update,
    descriptionOnSuccess?: string,
) => {
    let actionMessage = "updated";

    switch (action) {
        case useCase.Delete:
            actionMessage = "deleted";
            break;
        case useCase.Save:
            actionMessage = "saved";
            break;
    }

    if (isUpdated) {
        toast({
            title: `Successfully ${actionMessage} ${sectionName}!`,
            description: descriptionOnSuccess
                ? `${descriptionOnSuccess}.`
                : null,
        });
        return;
    }
    toast({
        title: `Failed to update ${sectionName}!`,
        description: "Please make sure you have a stable internet connection.",
        variant: "destructive",
    });
};

export default messageOnUpdate;
