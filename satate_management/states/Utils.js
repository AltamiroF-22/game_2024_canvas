export const drawStatusText = (context, input, player) => {
  context.fillStyle = "white";
  context.font = "38px Helvetica";
  context.fillText(`Last Input: ${input.lastKey}`, 30, 40);
  context.fillText(`Active state: ${player.currentState.state}`, 30, 80);
};
