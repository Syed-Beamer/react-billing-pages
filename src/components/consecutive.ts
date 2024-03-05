function validatePassword(value: string) {
  const consecutiveSequences = [
    "012",
    "123",
    "234",
    "345",
    "456",
    "567",
    "678",
    "789",
    "890",
    "qwe",
    "wer",
    "ert",
    "rty",
    "tyu",
    "yui",
    "uio",
    "iop",
    "asd",
    "sdf",
    "dfg",
    "fgh",
    "ghj",
    "hjk",
    "jkl",
    "zxc",
    "xcv",
    "cvb",
    "vbn",
    "bnm",
  ];

  for (let sequence of consecutiveSequences) {
    if (value.includes(sequence)) {
      return "Password shouldn’t contain consecutive characters in a row (like ‘abc’ or ‘123’)";
    }
  }
  return "";
}

export default validatePassword;
