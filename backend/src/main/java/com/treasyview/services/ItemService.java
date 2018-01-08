package com.treasyview.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import com.treasyview.dao.ItemDAO;
import com.treasyview.models.Item;

public class ItemService extends ItemDAO {
  public static void startTransaction() {
    if(!em.getTransaction().isActive()) {
      em.getTransaction().begin();
    }
  }

  public static void deleteChildrens(int itemId) {
    List<Item> itemChildrens;
    ArrayList<Integer> array_ids = new ArrayList<Integer>();
    ArrayList<Integer> array_actual_ids = new ArrayList<Integer>();

    itemChildrens = getChildItems(itemId);
    array_ids = getAllChildIds(itemChildrens, array_ids, array_actual_ids);
    deleteItems(array_ids);
  }

  private static void deleteItems(ArrayList<Integer> array_ids) {
    if (array_ids != null && array_ids.size() > 0) {
      Query query = em.createQuery("delete Item where id IN (:parent_id)");
      query.setParameter("parent_id", array_ids);
      query.executeUpdate();
    }
  }

  public static ArrayList<Integer> getAllChildIds(List<Item> itemChildrens, ArrayList<Integer> array_ids,
    ArrayList<Integer> array_actual_ids) {
    Query queryChildrens;
    boolean have_childrens;

    do {
      if (itemChildrens != null && itemChildrens.size() > 0 ) {
        if (array_actual_ids != null) {
          array_actual_ids.clear();
        }

        for (Item single_item : itemChildrens) {
          array_ids.add(single_item.getId());
          array_actual_ids.add(single_item.getId());
        }

        queryChildrens = em.createQuery("FROM Item item WHERE item.parent_id IN (:actual_ids)");
        queryChildrens.setParameter("actual_ids", array_actual_ids);
        itemChildrens = queryChildrens.getResultList();

        have_childrens = true;
      } else {
        have_childrens = false;
      }
    } while (have_childrens);

    return array_ids;
  }

  public static List<Item> getChildItems(int itemId) {
    Query queryChildrens;
    List<Item> itemChildrens;
    queryChildrens = em.createQuery("FROM Item item WHERE item.parent_id = :parent_id");
    queryChildrens.setParameter("parent_id", itemId);
    itemChildrens = queryChildrens.getResultList();

    return itemChildrens;
  }
}
