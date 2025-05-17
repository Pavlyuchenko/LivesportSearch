export function handleApiError(error: any) {
    alert(`Error ${error.code}: ${error.message}. Please try again later.`);
    window.location.reload();
}
