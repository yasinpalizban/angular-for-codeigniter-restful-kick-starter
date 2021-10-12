export function notificationColor(index: number): number {

  if (index <= 6) {
    return index;
  } else if (index % 6 > 0) {
    return index % 6;
  } else {
    return 6;
  }
}
