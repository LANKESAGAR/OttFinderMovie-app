export const getCountryName = (code) => {
    try {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return regionNames.of(code);
    } catch (error) {
      console.error("Error converting country code:", error);
      return code;
    }
  };