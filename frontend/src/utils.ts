export const emailPattern = {
  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  message: "Invalid email",
};

export const passwordPattern = {
  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  message: "Password must have at least 8 characters",
};

export const passwordRules = (isRequired = true) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  };

  if (isRequired) {
    rules.required = "Password is required";
  }

  return rules;
};

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password;
      return value === password ? true : "The passwords do not match";
    },
  };

  if (isRequired) {
    rules.required = "Password confirmation is required";
  }

  return rules;
};

export const generateBusData = (count: number) => {
  const busData = [];
  const baseLat = 52.229675;
  const baseLng = 21.01223;

  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;

    const lat = baseLat + latOffset;
    const lng = baseLng + lngOffset;

    busData.push({
      busNumber: 100 + i,
      position: { X: lat, Y: lng },
    });
  }
  return busData;
};
