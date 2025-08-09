import { toast } from "sonner";

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

    if (!isUpdated) {
        toast.error(`Failed to update ${sectionName}!`, {
            description:
                "Please make sure you have a stable internet connection.",
        });
        return;
    }

    if (descriptionOnSuccess === undefined) {
        toast.success(`Successfully ${actionMessage} ${sectionName}!`);
        return;
    }
    toast.success(`Successfully ${actionMessage} ${sectionName}!`, {
        description: descriptionOnSuccess,
    });
};

export default messageOnUpdate;
