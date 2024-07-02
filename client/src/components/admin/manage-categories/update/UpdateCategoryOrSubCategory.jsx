import { useLocation } from "react-router-dom";
import UpdateSubCategory from "./UpdateSuCategory";
import UpdateCategory from "./UpdateCategory";

const UpdateCategoryOrSubCategory = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    const subCategoryId = queryParams.get('subCategoryId');
    // console.log(categoryId, subCategoryId);

    if (subCategoryId) {
        return (
            <UpdateSubCategory 
                categoryId={categoryId}
                subCategoryId={subCategoryId}
            />
        );
    } else {
        return (
            <UpdateCategory 
                categoryId={categoryId}
            />
        );
    }
}

export default UpdateCategoryOrSubCategory;