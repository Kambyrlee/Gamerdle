export async function getBackendMessage() {
    const response = await fetch("http://localhost:8080/api/hello");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const text = await response.text();
    return text;
}