package com.treasyview.util;

public class ItemUtil {
  public static boolean invalidFields(String title, String description) {
    return (title == null || titleLenght(title) || descriptionLength(description));
  }

  private static boolean descriptionLength(String description) {
    return description != null && description.length() > 255;
  }

  private static boolean titleLenght(String title) {
    return title != null &&
      title.length() == 0 ||
      title.length() > 50;
  }
}
