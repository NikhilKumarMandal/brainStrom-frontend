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

export function handleActionString(
  action, userId, members,
  leaderId, localUserId, actorName
) {
  const username = getUsernameById(members, userId, localUserId, leaderId);

  switch (action) {
    case "REQUEST":
      return `${username} requested to join the team`;
    case "ACCEPTED_JOIN_REQUEST":
      return username === "Leader"
        ? "Leader a accepted the join request"
        : `${username} joined the team`;
    case "LEAVE":
      return "Left the team";
    case "KICKED_MEMBER":
      return "A member kicked from the team";
    case "LEFT_TEAM":
      return `${actorName} Left the team`;
    default:
      return formateString(action);
  }
}
