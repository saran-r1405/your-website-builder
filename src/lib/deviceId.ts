// Handles anonymous persistent device ID generation
export function getDeviceId(): string {
  const KEY = "bookmatch_device_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    // Generate a UUID v4
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
