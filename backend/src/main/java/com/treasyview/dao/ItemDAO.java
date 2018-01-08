package com.treasyview.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.treasyview.models.Item;
import com.treasyview.services.ItemService;
import com.treasyview.util.JPAUtil;

public class ItemDAO {
  protected static EntityManager em = new JPAUtil().getEntityManager();

  public static List<Item> findAllWithHierarchy() {
    List<Item> items = em.createQuery("FROM Item").getResultList();

    return items;
  }

  public static Item create(Item item) {
    ItemService.startTransaction();

    em.persist(item);

    em.getTransaction().commit();

    return item;
  }

  public static Item update(int itemId, String title, String description) {
    ItemService.startTransaction();

    Item item = em.find(Item.class, itemId);
    item.setTitle(title);
    item.setDescription(description);

    em.getTransaction().commit();

    return item;
  }

  public static void delete(int itemId) {
    ItemService.startTransaction();

    Item item = em.find(Item.class, itemId);
    em.remove(item);

    ItemService.deleteChildrens(itemId);

    em.getTransaction().commit();
  }
}
