export function formateString(string = "") {
  return string
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getUsernameById(members, userId, localUserId, leaderId) {
  if (userId === leaderId) {
    return "Leader";
  } else if (userId === localUserId) {
    return "You";
  }
  const member = members.find((m) => m.userId === userId);
  return member?.user?.name ?? "Unknown User";
}
