const toIsoDate = (date: Date) => date.toISOString().split("T")[0];

export default { toIsoDate };
