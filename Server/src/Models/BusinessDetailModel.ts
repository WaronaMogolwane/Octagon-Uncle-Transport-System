import { BusinessDetail } from "../Classes/BusinessDetail";
import { DbPool } from "../Services/DatabaseService";

export const InsertBusinessDetail = async (
  businessDetail: BusinessDetail,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL InsertNewBusinessDetail(?,?,?,?,?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        businessDetail.businessDetailId,
        businessDetail.businessName,
        businessDetail.businessPhoneNumber,
        businessDetail.addressLine1,
        businessDetail.addressLine2,
        businessDetail.suburb,
        businessDetail.city,
        businessDetail.province,
        businessDetail.postalCode,
        businessDetail.businessId,
      ],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export const UpdateBusinessDetail = async (
  businessDetail: BusinessDetail,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateBusinessDetail(?,?,?,?,?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        businessDetail.businessDetailId,
        businessDetail.businessName,
        businessDetail.businessPhoneNumber,
        businessDetail.addressLine1,
        businessDetail.addressLine2,
        businessDetail.suburb,
        businessDetail.city,
        businessDetail.province,
        businessDetail.postalCode,
        businessDetail.businessId,
      ],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export const GetBusinessDetailByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GETBusinessDetail(?);",
      timeout: 40000,
      values: [businessId],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export const GetBusinessDetailForParentByBusinessId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetBusinessDetailForParent(?);",
      timeout: 40000,
      values: [businessId],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};
