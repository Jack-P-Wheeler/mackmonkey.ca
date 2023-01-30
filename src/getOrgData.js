import { setOrganizationAction } from "./actions";

export const getOrganization = async (pb, dispatch) => {

    const allDocuments = await pb.collection('documents').getFullList(200, {
        sort: '-created',
        expand: 'author, category, team'
    });

    const lastUpdatedDocuments = await pb.collection('documents').getList(1, 3, {
        sort: '-updated',
        expand: 'author, category, team'
    });

    const categories = await pb.collection('buckets').getFullList(200, {
        sort: '-visits',
    });

    const teams = await pb.collection('teams').getFullList(200, {
        sort: '+name',
    });

    const organizationData = {
        allDocuments,
        lastUpdatedDocuments: lastUpdatedDocuments.items,
        categories,
        teams,
    }

    setOrganizationAction(dispatch, organizationData)
}